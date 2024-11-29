// ページが完全に読み込まれた後に実行される関数
window.onload = function () {
    // URLからクエリパラメータを取得する
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get('id'); // 'id'パラメータを取得

    if (userId) {
        // APIエンドポイントにGETリクエストを送信
        fetch(`/api/users/${userId}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }

                document.getElementById('name').value = data.user.rows[0].name;
                document.getElementById('age').value = data.user.rows[0].age;
            })
            .catch(error => {
                document.getElementById('message').textContent = error;
            });
    } else {
        document.getElementById('message').textContent = "URLにIDが見つかりません";
    }
};

document.getElementById('updateForm').onsubmit = function (event) {
    event.preventDefault();
    document.getElementById('message').textContent = '';

    // URLからクエリパラメータを取得する
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get('id'); // 'id'パラメータを取得

    const data = {
        id: userId,
        name: document.getElementById('name').value,
        age: document.getElementById('age').value
    };

    fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.status === 200) {
                // 更新が成功した場合、メッセージを表示
                document.getElementById('message').textContent = '更新できました';
            } else {
                throw new Error('更新に失敗しました');
            }
        })
        .catch((error) => {
            document.getElementById('message').textContent = error;
        });
};

document.getElementById('deleteButton').onclick = function(event) {
    event.preventDefault();
    // URLからクエリパラメータを取得する
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get('id'); // 'id'パラメータを取得

    fetch(`/api/users/${userId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.status == 200) {
            window.location.href = '/users?deleted=true';
        } else {
            throw new Error('削除に失敗しました');
        }
    })
    .catch(error => {
        document.getElementById('message').textContent = error;
    });
};

