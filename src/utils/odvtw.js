export const odvtw = (text, elm, cls, num) => {
    setTimeout(() => {
        try{
            let div = document.createElement('div')
            const {width, height} = document.querySelector(cls).getBoundingClientRect()
            div.style = "width: " + width + "px;height: 100%;overflow: hidden;display: inline-block;vertical-align: middle;text-overflow: ellipsis;white-space: nowrap;"
            div.innerHTML = text
            document.querySelector(cls).innerHTML = ""
            document.querySelector(cls).appendChild(div)
        }catch (error) {
            console.error(error)
        }

    }, 1000)
    return elm
}