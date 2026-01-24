document.addEventListener("DOMContentLoaded", () => {
    const dropzone = document.getElementById("dropzone");
    const fileInput = document.getElementById("fileInput");
    const chooseBtn = document.getElementById("chooseBtn");

    // Open file picker
    chooseBtn.addEventListener("click", () => fileInput.click());

    // Handle file selection
    fileInput.addEventListener("change", (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });

    // Drag & Drop
    dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("dragging");
    });

    dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove("dragging");
    });

    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragging");
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    // Handle PDF compression
    async function handleFile(file) {
        if (file.type !== "application/pdf") {
            alert("Please upload a PDF file.");
            return;
        }

        // Show loading
        dropzone.innerHTML = "<p>Compressing...</p>";

        try {
            // Example: send to backend API for compression
            const formData = new FormData();
            formData.append("pdf", file);

            const response = await fetch("php/pdf-compress.php", {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error("Compression failed");

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            // Create download link
            dropzone.innerHTML = `
                <p>Compression complete!</p>
                <a href="${url}" download="compressed.pdf" class="btn">Download PDF</a>
            `;
        } catch (err) {
            console.error(err);
            dropzone.innerHTML = "<p>Error compressing file.</p>";
        }
    }
});
