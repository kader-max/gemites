document.getElementById('dataForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('nameInput').value;
    const age = document.getElementById('ageInput').value;
    const number = document.getElementById('numberInput').value;

    try {
        const response = await fetch('/save-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, age, number })
        });

        if (response.ok) {
            alert('Data saved successfully!');
            location.reload(); // Reload the page
        } else {
            alert('Error saving data.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while trying to save data.');
    }
});