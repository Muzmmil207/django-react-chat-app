from django.shortcuts import render


def chat(r):
    return render(r, 'chat/index.html')
