// Your OpenAI API key (make sure to keep this secure!)
const OPENAI_API_KEY = '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';


// Get references to the DOM elements
const item = document.getElementById("items");
const dataContainer = document.getElementById("data");
const generateButton = document.getElementById("generateButton");

// Attach the event listener to the generate button
generateButton.addEventListener('click', generate);

// Function to call the OpenAI API and generate paragraphs
async function generate() {
  const numParagraphs = item.value;
  
  if (numParagraphs <= 0) {
    alert("The value must be greater than zero");
    return;
  }

  // Build the API request
  const data = {
    prompt: `Generate ${numParagraphs} random paragraphs of approximately 150 words each. The paragraphs should be about random topics and have coherent content. Make the paragraphs unique and informative, written in a casual tone.`,
    max_tokens: 150 * numParagraphs,
    temperature: 0.7
  };

  // Perform the API request
  try {
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseJSON = await response.json();
    const paragraphs = responseJSON.choices[0].text.trim().split('\n\n');

    // Display paragraphs
    const paragraphsHTML = paragraphs.map(paragraph => `<p>${paragraph}</p>`).join("");
    dataContainer.innerHTML = paragraphsHTML;
  
  } catch (error) {
    console.error('Error fetching paragraphs:', error);
    dataContainer.innerHTML = `<p>Failed to generate paragraphs. Please try again later.</p>`;
  }
}
