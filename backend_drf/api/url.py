import os
from django.conf import settings
import matplotlib.pyplot as plt

def save_image(plot_image_path):
    image_path = os.path.join(settings.MEDIA_ROOT , plot_image_path)
    plt.savefig(image_path)
    plt.close()
    plot_img = settings.MEDIA_URL + plot_image_path
    return plot_img