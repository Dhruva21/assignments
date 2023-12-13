let cnt = 0;
function clock(){
    // display the clock here
    const date = new Date();
    // Format 1: HH:MM:SS
    const timeFormat1 = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    const formattedTime1 = timeFormat1.format(date);

    // Format 2: HH:MM:SS AM/PM
    const timeFormat2 = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    const formattedTime2 = timeFormat2.format(date);
    console.log('Current Time (format 1) : ' + formattedTime1);
    console.log('Current Time (format 2) : ' + formattedTime2);
}

// use setInterval
function counter2() {
    clock();
    setInterval(counter2, 1000);
}

counter2();