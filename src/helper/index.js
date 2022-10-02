

export const convertDate = (dateInit)=>{
	if (dateInit.includes('T')){
		const newDate = new Date(dateInit);
		const month = newDate.toLocaleString("default", { month: "long" });
		const day = newDate.toLocaleString("default", { day: "numeric" });
		const dayword = newDate.toLocaleString("default", { weekday: "long" });
		const year = newDate.toLocaleString("default", { year: "numeric" });
		const time = newDate.toLocaleTimeString();

		return <div>{`${month}, ${day} ${year}
		${dayword}`}<span style={{display:'block'}}>{time}</span></div>;
	}
	return ''
}

export const convertRole = (roleByNumber) =>{
    let role = ''
    switch (roleByNumber) {
        case '1':
            role = 'Admin'
            break;
        case '2':
            role = 'User'
            break;
        case '3':
            role = 'Validator'
            break;
    
        default:
            break;
    }

    return role
}

export const convertStatusBerlaku = (statByNum)=>{
    let status = ''

    switch (statByNum) {
        case '0':
            status = 'NO'
            break;
        case '1':
            status = "YES"
            break;
        default:
            break;
    }

    return status
}
export const convertStatus = (statByNum)=>{
    let status = ''

    switch (statByNum) {
        case '0':
            status = 'Belum Validasi'
            break;
        case '1':
            status = "Approved"
            break;
        case '2':
            status = "Rejected"
            break;
        default:
            break;
    }

    return status
}
export const convertStatusToColor = (statByNum)=>{
    let status = ''

    switch (statByNum) {
        case '0':
            status = '#55AAFF'
            break;
        case '1':
            status = "green"
            break;
        case '2':
            status = "red"
            break;
        default:
            break;
    }

    return status
}