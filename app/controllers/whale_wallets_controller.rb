class WhaleWalletsController < ApplicationController
    skip_before_action :authorize

    def index
        render json: WhaleWallet.all, status: :ok
    end
end
