// ページが完全に読み込まれた後に実行される関数
window.onload = function () {
    const queryParams = new URLSearchParams(window.location.search);
    const isCreated = queryParams.get('created');
    if (isCreated) {
        document.getElementById('message').textContent = '新規作成できました';
    }

    const isDeleted = queryParams.get('deleted');
    if (isDeleted) {
        document.getElementById('message').textContent = '削除できました';
    }
    // /dataエンドポイントからデータを取得する
    fetch('/api/users', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            throw new Error(data.error);
        }

        const usersList = document.getElementById('usersList');
        usersList.innerHTML = '';
        data.users.rows.forEach(user => {
            const row = `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.age}</td>
                    <td><a href="/users/edit?id=${user.id}">編集ページ</a></td>
                </tr>`;
            usersList.innerHTML += row;
        });
    })
    .catch(error => {
        document.getElementById('errorMessage').textContent = error;
    });
};
