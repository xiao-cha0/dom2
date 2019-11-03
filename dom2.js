window.dom = {
    create(string) { 
        const container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.firstChild
    },
    after(node, node2) { 
        node.parentNode.insertBefore(node2,node.nextSibling)
    },
    before(node, node2) { 
        node.parentNode.insertBefore(node2, node);
    },
    append(parent, node) { 
        parent.appendChild(node);
    },
    warp(node, parent) { 
        dom.before(node, parent);
        dom.append(parent,node)
    },
    remove(node) { 
        node.parentNode.removeChild(node)
        return node
    },
    empty(node) { //此时的node是parent
       // const { childNodes } = node //等同于 const childNodes = node.childNodes(表示从他爸爸哪里得到所有儿子)
       // let array = []
       // for (let i = 0; i < childNodes.length; i++) { 
       //     dom.remove(childNodes[i])
        //    array.push(childNodes[i])
       // }
       // return array
        //因为childNodes.length会由for循环而发生变化；所以上面的写法不适用，我们还是使用while循环
        let x = node.firstChild
        let array = []
        while (x) { 
            array.push(dom.remove(node.firstChild))
            x = node.firstChild//因为我们删除他的儿子后，他的下一个儿子就会变成大儿子
        }
        return array
    },
    attr(node, name, value) { //重载
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) { 
            return node.getAttribute(name)
        }
    },
    text(node, string) {//适配
        if (arguments.length === 2) {//写
            if ('innerText in node') {//写并判断是否支持IE
                node.innerText = string
            } else {
                node.textContent = string
            }
        } else if (arguments.length === 1) { //读
            if ('innerText in node') {
                 return node.innerText 
            } else { 
               return node.textContent
            }
        }
        
    },
    html(node, string) { 
        if (arguments.length === 2) {//写
            node.innerHTML = string
        } else if (arguments.length === 1) { //读
            return node.innerHTML
        }
    },

    style(node, name, value) { 
        if (arguments.length === 3) {//根据元素个数判断是读？是写？
            node.style(name) = value
        } else if (typeof name === 'string') {//根据元素属性判断是读？是写？
            return node.style(name)
         } else if (name instanceof Object) { //根据元素类型判断是读？是写？
            for (let key in object) { 
                node.style[key] = object[key]
            }
        }
    },
    class: {
        add(node, className) { //添加
            node.classList.add(className)
        },
        remove(node, className) { //删除
            node.classList.remove(className)
        },
        has(node, className) {//检查是否存在
           return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) { 
        node.addEventListener(eventName,fn)
    },
    off(node, eventName, fn) { 
        node.removeEventListener(eventName,fn)
    },
    find(selector, scope) { //给我一个选择器和一个范围
        return (document || scope).querySelectorAll(selector)//返回一个数组
    },
    parent(node) { 
        return node.parentNode
    },
    children(node){ 
    return node.children
    },
    sibling(node) { 
        return Array.from(node.parentNode.children).filter(n=>n!==node)//Array.from()表示将括号内的元素变成数组
    },
    next(node) { 
        let x = node.nextSibling
        while (x && x.type === 3) { 
            x =  x.nextSibling
        }
    },
    previous(node) { 
        let x = node.previousSibling
        while (x && x.type === 3) { 
            x =  x.previousSibling
        }
        return x
    },
    each(nodeList, fn) { 
        for (let i = 0; i < nodeList.length; i++) { 
            fn.call(null,nodeList[i])
        }
    },
    index(node) { 
        let list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) { 
            if (list[i] === node)
                break
        }
        return i
    }
    

    



};