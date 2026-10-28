"""Inventory CSS spacing declarations and their token dependencies (standard library)."""

import argparse
import csv
import hashlib
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPACING = re.compile(
    r'^(?:margin(?:-.+)?|padding(?:-.+)?|gap|row-gap|column-gap|'
    r'inset(?:-.+)?|top|right|bottom|left|outline-offset)$'
)
REFERENCE = re.compile(r'var\(\s*(--[\w-]+)')


def declarations(source):
    """Read declarations inside layered/nested CSS, retaining contexts and lines."""
    clean = re.sub(r'/\*.*?\*/', lambda match: '\n' * match[0].count('\n'), source, flags=re.S)
    stack, records = [], []
    buffer, line, start, quote, escaped, depth = '', 1, 1, None, False, 0

    def record():
        if ':' not in buffer:
            return
        prop, value = buffer.split(':', 1)
        prop = prop.strip()
        if not re.fullmatch(r'(?:--)?[\w-]+', prop):
            return
        records.append({
            'line': start,
            'context': ' > '.join(stack),
            'property': prop,
            'value': re.sub(r'\s+', ' ', value.strip()),
        })

    for char in clean:
        if not buffer.strip() and not char.isspace():
            start = line
        if quote:
            buffer += char
            if escaped:
                escaped = False
            elif char == '\\':
                escaped = True
            elif char == quote:
                quote = None
        elif char in ('"', "'"):
            quote = char
            buffer += char
        elif char == '(':
            depth += 1
            buffer += char
        elif char == ')':
            depth -= 1
            buffer += char
        elif char == '{' and not depth:
            stack.append(re.sub(r'\s+', ' ', buffer.strip()))
            buffer = ''
        elif char == '}' and not depth:
            record()
            buffer = ''
            stack.pop()
        elif char == ';' and not depth:
            record()
            buffer = ''
        else:
            buffer += char
        if char == '\n':
            line += 1
    return records


def spacing_records(source):
    records = declarations(source)
    # The page gutter is also consumed by width: calc(100% - 2 * gutter).
    needed = {'--page-gutter'}
    for record in records:
        if SPACING.fullmatch(record['property']):
            needed.update(REFERENCE.findall(record['value']))
    while True:
        previous = needed.copy()
        for record in records:
            if record['property'] in needed:
                needed.update(REFERENCE.findall(record['value']))
        if needed == previous:
            break
    return [record for record in records
            if SPACING.fullmatch(record['property']) or record['property'] in needed]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--css', type=Path, default=ROOT / 'assets/css/style.css')
    parser.add_argument('--output', type=Path, default=ROOT / 'docs/audits/spacing')
    args = parser.parse_args()
    source = args.css.read_text()
    records = spacing_records(source)
    groups = defaultdict(list)
    for record in records:
        groups[re.sub(r'\s+', '', record['value'])].append(record)
    args.output.mkdir(parents=True, exist_ok=True)
    source_path = args.css.resolve()
    source_label = str(source_path.relative_to(ROOT)) if source_path.is_relative_to(ROOT) else source_path.name
    inventory = {
        'source': source_label,
        'source_sha256': hashlib.sha256(source.encode()).hexdigest(),
        'scope': 'Spacing declarations and referenced tokens, including inactive/overridden rules. Not computed layout measurements.',
        'declaration_count': len(records),
        'unique_expression_count': len(groups),
        'declarations': records,
    }
    (args.output / 'declarations.json').write_text(json.dumps(inventory, ensure_ascii=False, indent=2) + '\n')
    with (args.output / 'unique-values.csv').open('w', newline='', encoding='utf-8-sig') as file:
        writer = csv.writer(file, lineterminator='\n')
        writer.writerow(['expression', 'properties', 'css_lines', 'contexts'])
        for items in sorted(groups.values(), key=lambda rows: rows[0]['value']):
            writer.writerow([
                items[0]['value'],
                ' | '.join(sorted({item['property'] for item in items})),
                ' | '.join(str(item['line']) for item in items),
                ' | '.join(f"L{item['line']} {item['context']} / {item['property']}" for item in items),
            ])
    print(json.dumps({key: inventory[key] for key in ['source', 'source_sha256', 'declaration_count', 'unique_expression_count']}, indent=2))


if __name__ == '__main__':
    main()
