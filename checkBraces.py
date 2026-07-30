import sys

def find_mismatch(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        code = f.read()
    
    stack = []
    lines = code.split('\n')
    
    in_string = False
    str_char = ''
    in_line_comment = False
    in_comment = False

    for i, line in enumerate(lines):
        in_line_comment = False
        j = 0
        while j < len(line):
            char = line[j]
            
            if not in_string and not in_comment and not in_line_comment:
                if char == '/' and j+1 < len(line) and line[j+1] == '/':
                    in_line_comment = True
                    j += 1
                elif char == '/' and j+1 < len(line) and line[j+1] == '*':
                    in_comment = True
                    j += 1
                elif char in ("'", '"', '`'):
                    in_string = True
                    str_char = char
                elif char == '{':
                    stack.append((i+1, j+1))
                elif char == '}':
                    if stack:
                        stack.pop()
                    else:
                        print(f'Extra }} at line {i+1}')
                        return
            elif in_line_comment:
                break
            elif in_comment:
                if char == '*' and j+1 < len(line) and line[j+1] == '/':
                    in_comment = False
                    j += 1
            elif in_string:
                if char == str_char and (j == 0 or line[j-1] != '\\'):
                    in_string = False
            
            j += 1
    
    if stack:
        print(f'The innermost unclosed {{ is from line {stack[-1][0]} col {stack[-1][1]}')
        if len(stack) > 1:
            print(f'And the one before it is from line {stack[-2][0]} col {stack[-2][1]}')

find_mismatch('src/components/forms/PatientProfileForm.jsx')
