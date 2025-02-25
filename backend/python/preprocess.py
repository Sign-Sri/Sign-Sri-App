# preprocess.py
import sys
import re
import contractions

def preprocess_for_fingerspelling(input_text):
    # Expand contractions
    input_text = contractions.fix(input_text)
    
    # Convert to lowercase
    input_text = input_text.lower()
    
    # Remove unsupported characters
    input_text = re.sub(r"[^a-z0-9\s]", "", input_text)
    
    # Tokenize and join
    words = input_text.split()
    return " ".join(words)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python preprocess.py <text>")
        sys.exit(1)
        
    input_text = sys.argv[1]
    result = preprocess_for_fingerspelling(input_text)
    print(result) 
