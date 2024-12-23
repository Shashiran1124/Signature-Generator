document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const fontSelector = document.getElementById('fontSelector');
    const signaturePreview = document.getElementById('signature');
    const downloadButton = document.getElementById('downloadButton');

    // Function to generate random jitter for smooth randomness
    const randomJitter = () => {
        return Math.random() * (Math.random() > 0.5 ? 1 : -1); // random slight jitter
    };

    // Function to create the "writing" effect
    const animateWriting = (signatureText) => {
        const chars = signatureText.split('');
        signaturePreview.innerHTML = ''; // Reset the signature preview
        chars.forEach((char, index) => {
            const span = document.createElement('span');
            span.innerText = char;
            span.style.fontFamily = fontSelector.value;
            span.style.fontSize = '40px'; // Ensure font size is consistent
            span.style.margin = '0 1px'; // Add spacing between characters
            span.style.opacity = '1'; // Ensure the letter is visible

            // Optional: Apply jitter effects
            span.style.position = 'relative';
            span.style.transform = `rotate(${randomJitter()}deg) translate(${randomJitter()}px, ${randomJitter()}px)`;

            // Add the span element to the signature preview
            signaturePreview.appendChild(span);
        });
    };

    // Function to handle real-time input and smooth writing effect
    const updateSignature = () => {
        const name = nameInput.value.trim();
        if (name) {
            animateWriting(name);
        } else {
            signaturePreview.innerHTML = 'Your Signature will display here';
        }
    };

    // Event listeners for dynamic updates
    nameInput.addEventListener('input', updateSignature);
    fontSelector.addEventListener('change', updateSignature);

    // Download the signature as an image with increased scale for better resolution
    downloadButton.addEventListener('click', () => {
        html2canvas(signaturePreview, {
            scale: 2 // Increase scale for higher resolution
        }).then((canvas) => {
            const link = document.createElement('a'); // Correctly create the anchor tag
            link.download = 'signature.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });
});
