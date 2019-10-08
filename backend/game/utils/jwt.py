def get_secret_key(user_model):
    if hasattr(user_model, 'user_secret'):
        return user_model.user_secret
    return None
