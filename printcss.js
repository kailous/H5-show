let styles = "";
for (let i = 0; i <= 120; i++) {
    let time = i / 4;
    let formattedTime = time.toFixed(2); // Time in seconds, rounded to 2 decimal places
    let className = `.anim-${formattedTime.replace('.', '_')}s`; // Initial class name with underscore
    // Adjust class name for integer and half-integer values
    if (time % 1 === 0) {
        className = `.anim-${time}s`; // For integer values like 1s, 2s, etc.
    } else if (time % 1 === 0.5) {
        className = `.anim-${time.toFixed(1).replace('.', '_')}s`; // For half-integer values like 1_5s, 2_5s, etc.
    }
    let comment = ` /* ${formattedTime} 秒 */`; // Comment indicating the duration in seconds
    styles += `${className} {animation-duration: ${formattedTime}s;}${comment}\n`;
}
console.log(styles);
