document.addEventListener("DOMContentLoaded", function () {
  const analyzeBtn = document.getElementById("analyze-btn");
  const suggestionsPre = document.getElementById("suggestions");

  analyzeBtn.addEventListener("click", async () => {
    const response = await fetch("/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      suggestionsPre.textContent = data.suggestions;
    } else {
      suggestionsPre.textContent = "Error analyzing code.";
    }
  });
});
