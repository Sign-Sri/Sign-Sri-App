```markdown
# Sign-Sri-App
This is the repository of Sign Sri App

## Prerequisites
- Node.js version: [specified version from .nvmrc]
- Python version: [specify version]
- npm or yarn
- Expo CLI

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd [repository-name]
   ```

2. Frontend setup:
   ```bash
   cd frontend
   nvm use  # Ensure correct Node.js version
   npm install
   npx expo start  # To start the development server
   ```

3. Backend setup:
   ```bash
   cd ../backend
   # Node.js setup
   npm install
   
   # Python setup
   python -m venv venv
   source venv/bin/activate  # or `.\venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   ```

