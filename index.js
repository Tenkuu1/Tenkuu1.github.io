class Index {
    constructor() {
        window.addEventListener("load", (event) => {
            this.listenInputChange()
            this.lazyloadIframe()
        });
    }

    listenInputChange(){
        document.querySelector('.search input').addEventListener('change', (event) => {
            const search = event.target.value;
            this.findAnime(search)
        });
    }

    findAnime(search){
        document.querySelectorAll('.animes h2').forEach(($el) => {
            $el.closest('.animes').classList.remove('hidden');

            console.log($el.textContent);

            if(!$el.textContent.toLowerCase().includes(search.toLowerCase())){
                $el.closest('.animes').classList.add('hidden');
            }
        })
    }

    lazyloadIframe(){
        const lazyLoadInstance = new LazyLoad({
            // Your custom settings go here
        });
    }
}

new Index();