
def test_get_routes_view(api_client):
    response = api_client.get('/api/')
    print(response.data)
    assert response.status_code == 200
    assert len(response.data) == 4

