module.exports.getdate = () => {
    let dateViewOptions={ weekday: 'long', day:'numeric', month:'long' };
    var today = new Date();
    return today.toLocaleDateString('en-IN',dateViewOptions);
};

module.exports.getday = () =>{
    let dayViewOptions={ weekday: 'long'};
    var today = new Date();
    return today.toLocaleDateString('en-IN',dayViewOptions);
};
