document.getElementById('createForm').onsubmit = function (event) {
    event.preventDefault();
    document.getElementById('message').textContent = '';
    const data = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value
    };

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.status === 201) {
                window.location.href = '/users?created=true';
            } else {
                throw new Error('新規作成に失敗しました');
            }
        })
        .catch((error) => {
            document.getElementById('message').textContent = error;
        });
};
