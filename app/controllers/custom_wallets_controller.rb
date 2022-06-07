class CustomWalletsController < ApplicationController

    def create
        wallet = CustomWallet.create!(wallet_params)
        render json: wallet, status: :created
    end

    def index
        render json: @current_user.custom_wallets, status: :ok
    end

    def destroy
        wallet = finder
        wallet.destroy
        head :no_content
    end

    def update
        wallet = finder
        wallet.update(wallet_params)
        render json: wallet, status: :ok
    end

    private
        def wallet_params
            params.permit(:user_id, :wallet_address, :alias)
        end

        def finder
            wallet = CustomWallet.find(params[:id])
        end
end
