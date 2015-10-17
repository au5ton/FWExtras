function dateStringToHumanizedString(str) {
    var date_object = new Date(str);
    var normal_hour;
    var AmPm;
    if(date_object.getHours() === 0) {
        normal_hour = '12';
        AmPm = 'AM';
    }
    else if(date_object.getHours() > 12) {
        normal_hour = (date_object.getHours()-12)+'';
        AmPm = 'PM';
    }
    else if(date_object.getHours() === 12) {
        normal_hour = date_object.getHours()+'';
        AmPm = 'PM';
    }
    else {
        normal_hour = date_object.getHours()+'';
        AmPm = 'AM';
    }
    return (date_object.getMonth()+1)+'/'+(date_object.getDate())+' '+normal_hour+':'+(date_object.getMinutes())+' '+AmPm;
}
