import { useDrop,useDrag } from 'react-dnd';

export const WithDrag = (props)=>{
    const {type,item, onDragStyle,iddleStyle, children} = props;
    const [{isDragged},dragRef] = useDrag({
        type: type,
        item: item,
        collect: monitor=>({isDragged: monitor.isDragging()}),

    })

    return (
        <div ref={dragRef} style={isDragged ? onDragStyle : iddleStyle}> 
       {children}
        
        </div>
    )
}

export const WithDrop = (props)=>{
const {type, onDropCallback, onHoverStyle,iddleStyle, children} = props;
    const [{isHover},dropRef] = useDrop({
        accept: type,
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item){
            onDropCallback(item)
        }
    })
    return(
        <div ref={dropRef}
         style={isHover ? onHoverStyle : iddleStyle}
         >
                {children}
        </div>
    )
}