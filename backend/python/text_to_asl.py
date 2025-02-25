# text_to_asl.py
import sys
from PIL import Image
import os

def text_to_asl_gif(preprocessed_text, asl_folder, output_file, frame_duration):
    frames = []
    
    for char in preprocessed_text:
        if char == " ":
            image_path = os.path.join(asl_folder, "space.png")
        else:
            image_path = os.path.join(asl_folder, f"{char.lower()}.png")
            
        if os.path.exists(image_path):
            img = Image.open(image_path)
            frames.append(img)
        else:
            print(f"Warning: No image found for '{char}'.", file=sys.stderr)
    
    if frames:
        frames[0].save(
            output_file,
            save_all=True,
            append_images=frames[1:],
            duration=int(frame_duration),
            loop=0
        )
        print(f"ASL animation saved as {output_file}")
        return True
    else:
        print("No valid images found.", file=sys.stderr)
        return False

if __name__ == "__main__":
    if len(sys.argv) < 5:
        print("Usage: python text_to_asl.py <text> <asl_folder> <output_file> <frame_duration>")
        sys.exit(1)
        
    text = sys.argv[1]
    asl_folder = sys.argv[2]
    output_file = sys.argv[3]
    frame_duration = int(sys.argv[4])
    
    success = text_to_asl_gif(text, asl_folder, output_file, frame_duration)
    sys.exit(0 if success else 1)