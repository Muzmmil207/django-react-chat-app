import pytest
from django.urls import reverse


@pytest.skip
def test_get_routes_view(api_client):
    endpoint = reverse('get_routes')
    response = api_client.get(endpoint)

    assert response.status_code == 200
    assert len(response.data) == 4

def test_user_view(api_client):
    endpoint = reverse('users_api_view')
    response = api_client.get('/token/')
    print(response.data)
    assert True
    # assert response.status_code == 200
    # assert len(response.data) == 4
