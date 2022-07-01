class Index {
    constructor() {
        this.declareServiceWorker()

        window.addEventListener("load", (event) => {
            this.listenInputChange()
            this.lazyloadIframe()
            this.listenCoverClick()
        });
    }

    listenCoverClick(){
        document.querySelectorAll('#list .anime__item a').forEach($link => {
            $link.addEventListener('click', (event) => {
                event.preventDefault();
                const search = event.currentTarget.dataset.value;
                const $select =  document.querySelector('.search select.selectAnime');
                console.log(search);
                $select.value = search;
                $select.dispatchEvent(new Event('change'))
            })
        })
    }

    listenInputChange(){
        document.querySelector('.search select.selectAnime').addEventListener('change', (event) => {
            const search = event.target.value;
            this.findAnime(search)

            if(search == ''){
                document.querySelector('.search select.selectEpisod').classList.add('hidden')

                document.querySelectorAll('.animes').forEach(($el) => {
                    $el.classList.remove('active');
                });

                document.querySelectorAll('.animes__video.hidden').forEach(($el) => {
                    $el.classList.remove('hidden')
                });
            }
        });

        document.querySelector('.search select.selectEpisod').addEventListener('change', (event) => {
            const search = event.target.value;
            this.findEpisod(search)
        });
    }

    findAnime(search){
        document.querySelectorAll('.animes h2').forEach(($el) => {
            const $animes = $el.closest('.animes');
            $animes.classList.remove('hidden');

            if(!$el.textContent.toLowerCase().includes(search.toLowerCase())){
                $animes.classList.add('hidden');
            } else {
                $animes.classList.add('active');
                this.updateSelectEpisod($animes);
            }
        })
    }

    findEpisod(search){
        document.querySelectorAll('.animes:not(.hidden) h3').forEach(($el) => {
            const $animes = $el.closest('.animes__video');
            $animes.classList.remove('hidden');

            if(!$el.textContent.toLowerCase().includes(search.toLowerCase())){
                $animes.classList.add('hidden');
            }
        })
    }

    updateSelectEpisod($animes) {
        const title = $animes.querySelector('h2').textContent;
        const $select = document.querySelector('.selectEpisod');

        $select.querySelectorAll('option').forEach(($el) => {
            if($el.value != ''){
                $el.remove();
            }
        })

        $animes.querySelectorAll('h3').forEach(($el) => {
            const episod = $el.textContent.replace(title + ' ', '');
            console.log(episod);
            const option = document.createElement("option");
            option.value = episod;
            option.text = episod;
            $select.appendChild(option);
        });
        $select.classList.remove('hidden');
    }

    lazyloadIframe(){
        if(!LazyLoad){
            return;
        }
        
        const lazyLoadInstance = new LazyLoad({
            // Your custom settings go here
        });
    }

    declareServiceWorker(){
        console.log("test")
        if ("serviceWorker" in navigator) {
            // Puis on déclare celui-ci
            // via la fonction `register`
            
            navigator.serviceWorker
              .register("/service-worker.js")
              .then(registration => {
                // On a réussi ! Youpi !
                console.log(
                  "App: Achievement unlocked."
                );
              })
              .catch(error => {
                // Il y a eu un problème
                console.error(
                  "App: Crash de Service Worker",
                  error
                );
              });
          }
    }
}

new Index();