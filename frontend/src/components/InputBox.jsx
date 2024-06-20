export function InputBox({label,placeholder,onChange}){
    return <div>
        <div className="text-sm py-2 text-left font-medium">
            {label}            
        </div>
        <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200"  />
    </div>

}