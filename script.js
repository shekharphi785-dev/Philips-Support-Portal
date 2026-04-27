async function handleEscalationFormSubmission(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
        const response = await fetch('/api/escalation', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        // Success handling
        const result = await response.json();
        pToast.success('Form submitted successfully!');
        console.log(result);

    } catch (error) {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
        pToast.error('Failed to submit the form: ' + error.message);
    } finally {
        // Additional cleanup if necessary
        event.target.reset();
    }
}