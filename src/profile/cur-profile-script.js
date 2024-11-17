let modalBodyFollowing;
let modalBodyFollowers;
let promises = [];
['followers', 'following'].forEach((type) => {
    promises.push(fetch(`./profile/modal-body-${type}.html`));
});
Promise.all(promises).then((responses) => {
    return Promise.all(responses.map((response) => response.text()));
}).then((texts) => {
    modalBodyFollowers = new DOMParser().parseFromString(texts[0], 'text/html').body.firstChild;
    modalBodyFollowing = new DOMParser().parseFromString(texts[1], 'text/html').body.firstChild;
    let modalBody = document.getElementById('followModalBody');
    for (let i = 0; i < 5; i++) {
        modalBody.appendChild(modalBodyFollowers.cloneNode(true));
    }

    let followersEl = document.getElementById('followersCol');
    let followingEl = document.getElementById('followingCol');
    [followersEl, followingEl].forEach((el) => {
        el.addEventListener('click', () => {
            if (el.style.fontWeight === 'bold') {
                return;
            }
            modalBody.innerHTML = '';
            el.style.fontWeight = 'bold';
            if (el === followersEl) {
                followingEl.style.fontWeight = 'normal';
                for (let i = 0; i < 5; i++) {
                    modalBody.appendChild(modalBodyFollowers.cloneNode(true));
                }
            } else {
                followersEl.style.fontWeight = 'normal';
                for (let i = 0; i < 5; i++) {
                    modalBody.appendChild(modalBodyFollowing.cloneNode(true));
                }
            }
        });
    });
});
