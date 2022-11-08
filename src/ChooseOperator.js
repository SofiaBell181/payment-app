
export default function ChooseOperator({operator, funChooseOperator}) {
    
    return(
        <>
         <div className="step-operator_block">
             {operator.map(item => {
                const {id, image, operator} = item 
                return (
                    <div onClick={() => funChooseOperator(id)} className="block" key={id}>
                        <img src={image} width="180" alt={id} />
                        <button>{operator}</button>
                    </div> 
                )
             }      
            )}
         </div>
        </>

    )
    }

