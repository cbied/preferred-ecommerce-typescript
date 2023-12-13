import './loading-page.styles.scss';

type LoadingPageProps = {
    isLoading: boolean
}

const LoadingPage = ({ isLoading }: LoadingPageProps) => {
        return (
             isLoading ? 
                <div className="loading">
                <div className="main">
                    <div className="small1">
                    <div className="small ball smallball1"></div>
                    <div className="small ball smallball2"></div>
                    <div className="small ball smallball3"></div>
                    <div className="small ball smallball4"></div>
                    </div>

                    <div className="small2">
                    <div className="small ball smallball5"></div>
                    <div className="small ball smallball6"></div>
                    <div className="small ball smallball7"></div>
                    <div className="small ball smallball8"></div>
                    </div>

                    <div className="bigcon">
                    <div className="big ball"></div>
                    </div>
                </div>
            </div>  
            : 
            <span></span>  
        )
    }

    export default LoadingPage