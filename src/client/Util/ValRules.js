const ValRules = [
    {   
        mode: function() {
            if(process.env.NODE_ENV === 'development'){ 
                return 'development';
            }else{
                return 'production';
            }   
        }
    },
    {   
        log:{
            dev: function(data) { console.log(data)},
            prod: function(data) { console.log(data)}
            }
    },
    {
        name: 'fname',
        required: true,
        alphanumeric: 'true',
        errorMsg: 'Your name is required'
    },
    {
        name: 'email',
        required: true,
        email: true,
        errorMsg: 'That email or password is not valid'
    },
    {
        name: 'password',
        required: true,
        errorMsg: 'That email or password is not valid'
    },
    {
        name: 'message',
        required: true,
        alphanumeric: true,
        errorMsg: 'Please tell us a little about your business needs'
    },
    {
        name: 'date',
        required: true,
        alphanumeric: true,
        errorMsg: 'Please provide a date'
    }
]

export default ValRules;