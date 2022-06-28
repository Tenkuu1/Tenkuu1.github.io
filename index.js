class Index {
    constructor() {
        window.addEventListener("load", (event) => {
            this.listenInputChange()
        });
    }

    listenInputChange(){
        document.querySelector('.search input').addEventListener('change', (event) => {
            const search = event.target.value;
            this.findEpisod(search)
        });
    }

    findEpisod(search){
        document.querySelectorAll('.video h2').forEach(($el) => {
            $el.closest('.video').classList.remove('hidden');

            console.log($el.textContent);

            if(!$el.textContent.includes(search)){
                $el.closest('.video').classList.add('hidden');
            }
        })
    }
}

new Index();