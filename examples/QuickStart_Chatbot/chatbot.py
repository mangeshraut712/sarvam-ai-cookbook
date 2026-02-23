# Import necessary libraries
import argparse

import requests


def get_chat_response(api_key: str, user_input: str) -> str:
    """
    Get a response from the Sarvam AI Chat Completions API.

    Args:
        api_key: Sarvam AI API key
        user_input: User's message/question

    Returns:
        Bot's response as a string

    Raises:
        requests.exceptions.RequestException: If API request fails
    """
    # API endpoint and headers
    url = "https://api.sarvam.ai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    # Request payload
    payload = {
        "model": "sarvam-m",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant.",
            },
            {"role": "user", "content": user_input},
        ],
        "temperature": 0.7,
        "max_tokens": 500,
    }

    # Make API request
    response = requests.post(url, headers=headers, json=payload, timeout=30)
    response.raise_for_status()

    # Extract and return response
    return response.json()["choices"][0]["message"]["content"]


def main() -> None:
    """Main function to run the chatbot."""
    parser = argparse.ArgumentParser(
        description="Basic Sarvam AI Chatbot",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""Example:
  python chatbot.py --api-key your_api_key_here
  python chatbot.py --api-key your_api_key_here "What is AI?""",
    )
    parser.add_argument(
        "--api-key",
        required=True,
        help="Your Sarvam AI API key (get from https://dashboard.sarvam.ai/)",
    )
    parser.add_argument(
        "message",
        nargs="?",
        help="Optional message to process (if not provided, will prompt for input)",
    )

    args = parser.parse_args()

    try:
        if args.message:
            # Process message from command line argument
            user_input = args.message.strip()
            if user_input:
                bot_response = get_chat_response(args.api_key, user_input)
                print(f"User: {user_input}")
                print(f"Bot: {bot_response}")
            else:
                print("Error: Empty message provided.")
        else:
            # Interactive mode
            print("Chatbot initialized. Enter your question (or 'quit' to exit).")

            while True:
                try:
                    user_input = input("You: ").strip()

                    if user_input.lower() in ["quit", "exit", "bye"]:
                        print("Goodbye!")
                        break

                    if not user_input:
                        print("Please enter a message.")
                        continue

                    bot_response = get_chat_response(args.api_key, user_input)
                    print(f"Bot: {bot_response}")

                except KeyboardInterrupt:
                    print("\nGoodbye!")
                    break
                except EOFError:
                    print("\nGoodbye!")
                    break

    except requests.exceptions.RequestException as e:
        print(f"API Error: {e}")
        print("Please check your API key and internet connection.")
    except Exception as e:
        print(f"Unexpected error: {e}")


if __name__ == "__main__":
    main()
