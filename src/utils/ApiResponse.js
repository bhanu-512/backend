class ApiResponse{
    constructor(statuscode,data,message){
        this.statusCode=statuscode
        this.data=data
        this.message=message
        this.success=statusCode<400

    }
}
export {ApiResponse}