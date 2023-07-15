import { useNavigate } from "react-router-dom"

export const useGoBack = () => {
    const navigate = useNavigate();
    navigate(-1, { replace: true })
}