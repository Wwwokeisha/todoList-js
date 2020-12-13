class Tasker {
    constructor(selector, options){
        this.$El = document.querySelector(selector);
        this.color = options.color
        this.name = options.name
        this.init();
        this.list = [];
        this.addEventListener();
        this.count = this.list.length;
        this.render();  
    }
    toHTML(){
        return `
        <div class="${this.name}">
          <div class="container">
            <form class="${this.name}__form">
                <input class="${this.name}__form-input"/><button class="${this.name}__form-btn">Создать</button>
                <button class="${this.name}__form-delTasks">Удалить все задачи!</button>
            </form>
            <div class="${this.name}__list">
            
            </div>
          </div>  
        </div>
        `
    }
    init(){
        this.renderForm();
    }
    renderForm(){
        this.$El.innerHTML = this.toHTML();
        this.$input = document.querySelector(`.${this.name}__form-input`);
        this.$button = document.querySelector(`.${this.name}__form-btn`);
        this.$list = document.querySelector(`.${this.name}__list`);
        this.$form = document.querySelector(`.${this.name}__form`);
        this.$delTasks = document.querySelector(`.${this.name}__form-delTasks`);
        this.$El.style.color = this.color;
    }
    addEventListener(){
        this.$form.addEventListener('submit', this.addTask.bind(this));
        this.$delTasks.addEventListener('click', this.delAllTasks.bind(this));
    }
    delAllTasks(){
        let list = [...this.list]
        list = [];
        this.list = list;
        this.render();
    }
    addTask(event){
        event.preventDefault();
        if(this.$input.value !== '') {
            const list = [...this.list]

            const checkArList = list.filter(el => el.value === this.$input.value)
            if(checkArList.length === 0) {
                list.push({value: this.$input.value})
                this.list = list
                this.render()
                this.$input.value = '';
            } else  {
                return
            }

        } return
    }
        
    render(){
        this.$list.innerHTML = this.list.map((elem, index) => {
            return `
            <div class="${this.name}__item">
                ${index+1}. <span class="${this.name}__item-name">${elem.value}</span>
                <button class="${this.name}__item-btnDel">X</button>
            </div>
            `
        }).join('')
        const delbtn = this.$delBtn = document.querySelectorAll(`.${this.name}__item-btnDel`)
        delbtn.forEach(btn => btn.addEventListener('click', this.delTask.bind(this)))

        this.count = this.list.length
        document.querySelector('.count').textContent = this.count
        
    }
    delTask(event){
        const btn = event.target
        const name = btn.parentNode.querySelector(`.${this.name}__item-name`)
        
        const list = this.list.filter(function(elem) {
            return elem.value !== name.textContent
        });
        this.list = list;
        this.render();
    }

}


export default Tasker;