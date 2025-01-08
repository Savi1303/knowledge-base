export async function uploadFile(file) {
    const formData = new FormData();
    formData.append('fileInput', file);

    const response = await fetch('api/function', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }

    const data = await response.json();
    return `<div>File uploaded successfully: ${data.url}</div>`;
}


