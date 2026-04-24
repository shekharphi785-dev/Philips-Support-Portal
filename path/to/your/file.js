  // Update the escalationForm submit event listener for async handling
  escalationForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      submitButton.textContent = 'Submitting...';
      try {
          const response = await fetch('/submit', {
              method: 'POST',
              body: new FormData(escalationForm),
          });
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          // Handle success (show success toast)
          showToast('Form submitted successfully!');
      } catch (error) {
          // Error handling
          console.error('Error submitting the form:', error);
          showToast('There was an error submitting the form.');
      } finally {
          submitButton.textContent = 'Submit';
          escalationForm.reset();
      }
  });
