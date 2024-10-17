import os
import platform
import tkinter as tk
import uuid
import zipfile
from tkinter import filedialog, messagebox


# Function to determine base path based on operating system
def get_base_path():
    if platform.system() == "Windows":
        base_path = os.path.join(os.environ['USERPROFILE'], "Saved Games", "Tiny Glade", "Steam")
    else:
        base_path = os.path.expanduser("~/.local/share/Tiny Glade/Steam")
    return base_path

# Function to search for the correct Steam ID folder that contains a 'saves' subdirectory
def find_saves_folder(base_path):
    # List all subdirectories in the base Steam folder
    for steam_id in os.listdir(base_path):
        steam_id_path = os.path.join(base_path, steam_id)

        # Check if it is a directory and contains a 'saves' subfolder
        saves_path = os.path.join(steam_id_path, "saves")
        if os.path.isdir(saves_path):
            return saves_path

    return None

# Function to create a folder with a UUID as its name
def create_uuid_folder(base_path):
    new_uuid = str(uuid.uuid4())
    new_folder_path = os.path.join(base_path, new_uuid)
    os.makedirs(new_folder_path)
    return new_folder_path

# Function to extract the contents of a zip file to the specified folder
def extract_zip_to_folder(zip_file_path, new_folder_path):
    with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
        zip_ref.extractall(new_folder_path)

# Function to handle the file selection and installation process
def install_collection():
    base_path = get_base_path()

    # Check if the base path exists
    if not os.path.exists(base_path):
        messagebox.showerror("Error", "Steam folder not found. Exiting.")
        return

    # Search for a 'saves' folder in any Steam ID directory
    saves_folder = find_saves_folder(base_path)

    if not saves_folder:
        messagebox.showerror("Error", "No 'saves' folder found in any Steam ID directory.")
        return

    # Ask the user to select a zip file
    zip_file_path = filedialog.askopenfilename(title="Select Zip File", filetypes=[("Zip Files", "*.zip")])
    
    if not zip_file_path:
        messagebox.showinfo("Cancelled", "No file selected. Installation cancelled.")
        return

    # Create a folder with a UUID inside the 'saves' folder
    new_folder_path = create_uuid_folder(saves_folder)

    # Extract the zip file contents to the new folder
    extract_zip_to_folder(zip_file_path, new_folder_path)

    # Show success message
    messagebox.showinfo("Success", "Installation successful!")

# Function to handle the user's choice (Yes/No)
def on_yes():
    root.destroy()  # Close the main window
    install_collection()  # Proceed with installation steps

def on_no():
    root.quit()  # Close the app

# Main program starts here with the GUI

# Create main application window
root = tk.Tk()
root.title("Install TOD-Glade")

# Create a label for the main question
question_label = tk.Label(root, text="Do you want to add a TOD-Glade to your game?", font=("Arial", 12))
question_label.pack(pady=20)

# Create Yes/No buttons
yes_button = tk.Button(root, text="Yes", command=on_yes, width=10)
yes_button.pack(side=tk.LEFT, padx=20, pady=10)

no_button = tk.Button(root, text="No", command=on_no, width=10)
no_button.pack(side=tk.RIGHT, padx=20, pady=10)

# Start the GUI event loop
root.mainloop()
