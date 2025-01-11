import openai
import pygetwindow as gw
import pyautogui
from pynput import keyboard
import time

openai.api_key = "your-openai-api-key"

def get_active_window_text():
    try:
        active_window = gw.getActiveWindow()
        if active_window is None:
            return None
        pyautogui.hotkey("ctrl", "a")
        time.sleep(0.2)
        pyautogui.hotkey("ctrl", "c")
        time.sleep(0.2)
        return pyautogui.paste().strip()
    except Exception as e:
        return None

def get_ai_suggestions(code_snippet):
    try:
        prompt = f"Analyze the following code and suggest improvements:\n\n{code_snippet}"
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            temperature=0.7,
            max_tokens=500,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0,
        )
        return response.choices[0].text.strip()
    except Exception as e:
        return f"Error generating suggestions: {e}"

def on_activate():
    code = get_active_window_text()
    if code:
        suggestions = get_ai_suggestions(code)
        print("\n--- AI Suggestions ---\n")
        print(suggestions)
    else:
        print("No code detected or copied.")

def main():
    print("Press CTRL+SHIFT+S to analyze the code from the active window...")
    with keyboard.GlobalHotKeys({"<ctrl>+<shift>+s": on_activate}) as listener:
        listener.join()

if __name__ == "__main__":
    main()
