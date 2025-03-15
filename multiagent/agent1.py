import streamlit as st
from crewai import Agent, Task, Crew, Process
import os
from dotenv import load_dotenv
from langchain.chat_models import ChatOpenAI

load_dotenv()

def create_article_crew(topic):
    """Creates a team of agents to research, write, and edit an article on a given topic."""
    # Create a ChatOpenAI instance that uses OpenRouter with correct configuration
    openrouter_model = ChatOpenAI(
        model_name=model_name,
        openai_api_key=os.environ.get("OPENROUTER_API_KEY"),
        openai_api_base="https://openrouter.ai/api/v1",
        temperature=0.7,
        # Add required OpenRouter headers
        headers={
            "HTTP-Referer": "https://github.com/your-repo",  # Replace with your site URL
            "X-Title": "Multi Agent AI Researcher"  # Replace with your app name
        }
    )

    # Create agents with the model
    researcher = Agent(
        role='Researcher',
        goal='Conduct thorough research on the given topic',
        backstory='You are an expert researcher with a keen eye for detail',
        verbose=True,
        allow_delegation=False,
        llm=openrouter_model
    )

    writer = Agent(
        role='Writer',
        goal='Write a detailed and engaging article based on the research, using proper markdown formatting',
        backstory='You are a skilled writer with expertise in creating informative content and formatting it beautifully in markdown',
        verbose=True,
        allow_delegation=False,
        llm=openrouter_model
    )

    editor = Agent(
        role='Editor',
        goal='Review and refine the article for clarity, accuracy, engagement, and proper markdown formatting',
        backstory='You are an experienced editor with a sharp eye for quality content and excellent markdown structure',
        allow_delegation=False,
        llm=openrouter_model
    )

    # Tasks remain the same
    research_task = Task(
        description=f"Conduct comprehensive research on the topic: {topic}. Gather key information, statistics, and expert opinions.",
        agent=researcher,
        expected_output="A comprehensive research report on the given topic, including key information, statistics, and expert opinions."
    )

    writing_task = Task(
        description="""Using the research provided, write a detailed and engaging article.
        Ensure proper structure, flow, and clarity. Format the article using markdown, including:
        1. A main title (H1)
        2. Section headings (H2)
        3. Subsection headings where appropriate (H3)
        4. Bullet points or numbered lists where relevant
        5. Emphasis on key points using bold or italic text
        Make sure the content is well-organized and easy to read.""",
        agent=writer,
        expected_output="A well-structured, detailed, and engaging article based on the provided research, formatted in markdown with proper headings and subheadings."
    )

    editing_task = Task(
        description="""Review the article for clarity, accuracy, engagement, and proper markdown formatting.
        Ensure that:
        1. The markdown formatting is correct and consistent
        2. Headings and subheadings are used appropriately
        3. The content flow is logical and engaging
        4. Key points are emphasized correctly
        Make necessary edits and improvements to both content and formatting.""",
        agent=editor,
        expected_output="A final, polished version of the article with improved clarity, accuracy, engagement, and proper markdown formatting."
    )

    # Create the crew
    crew = Crew(
        agents=[researcher, writer, editor],
        tasks=[research_task, writing_task, editing_task],
        verbose=True,
        process=Process.sequential
    )

    return crew

# Streamlit app setup
st.set_page_config(page_title="Multi Agent AI Researcher", page_icon="📝")

# Custom CSS
st.markdown("""
    <style>
    .stApp {
        max-width: 1800px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
    }
    .st-bw {
        background-color: #f0f2f6;
    }
    .stButton>button {
        background-color: #4CAF50;
        color: white;
        font-weight: bold;
    }
    .stTextInput>div>div>input {
        background-color: #ffffff;
    }
    </style>
    """, unsafe_allow_html=True)

st.title("📝 Multi Agent AI Researcher")

# Sidebar for configuration
with st.sidebar:
    st.header("Configuration")
    # Updated model selection with common OpenRouter models
    model_options = [
        "google/gemini-2.0-pro-exp-02-05:free"
        "openai/gpt-3.5-turbo",
        "openai/gpt-4",
        "anthropic/claude-2",
        "google/gemini-pro",
        "meta-llama/llama-2-70b-chat",
        "mistralai/mistral-medium"
    ]
    model_name = st.selectbox(
        "Select OpenRouter model:",
        options=model_options,
        index=0  # Default to gpt-3.5-turbo
    )

    # Check for environment variable and model name
    if os.environ.get("OPENROUTER_API_KEY") and model_name:
        st.success("API Key and Model set successfully!")
    else:
        st.info("Please set the OPENROUTER_API_KEY environment variable to proceed.")

# Main content
st.markdown("Generate detailed articles on any topic using AI agents!")

topic = st.text_input("Enter the topic for the article:", placeholder="e.g., The Impact of Artificial Intelligence on Healthcare")

if st.button("Generate Article"):
    if not os.environ.get("OPENROUTER_API_KEY"):
        st.error("Please set the OPENROUTER_API_KEY environment variable.")
    elif not topic:
        st.warning("Please enter a topic for the article.")
    else:
        with st.spinner("🤖 AI agents are working on your article..."):
            crew = create_article_crew(topic)
            result = crew.kickoff()
            st.markdown(result)