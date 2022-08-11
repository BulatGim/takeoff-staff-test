import {IUserError} from "../types/contextTypes";

export const useUserError = (userError: IUserError[], setterUserErrors: (arr: IUserError[]) => void) => {

    function showUserError(formInput: string, errorMessage: string):void {
        let isPrev = false;
        userError.map((item:IUserError) => {
            if (item.formInput === formInput) {
                return isPrev = true;
            }
        })
        if (isPrev){
            return
        }
        const obj: IUserError = {
            error: errorMessage,
            formInput: formInput
        }
        userError.push(obj)
        setterUserErrors(userError)
    }
    function hideUserError(formInput: string):void | boolean{
        for (let i = 0; i < userError.length; i++) {
            if (userError[i].formInput === formInput) {
                let arr = userError.splice(i, 1)
                return setterUserErrors(arr)
            }
        }
    }

    return {showUserError, hideUserError}
}

