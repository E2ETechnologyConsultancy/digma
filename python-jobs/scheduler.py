"""
Simple scheduler runner: runs each job once and POSTs results to the API health endpoint.
This is intentionally minimal so you can run it locally without extra infra.
"""
import os
import requests


API_HOST = os.environ.get('API_HOST', 'http://api:5000')


def run_meta_job():
    # placeholder: would call Meta API and assemble metrics
    return {'job': 'meta', 'status': 'skipped', 'metrics': {}}


def run_google_job():
    # placeholder: would call Google API and assemble metrics
    return {'job': 'google', 'status': 'skipped', 'metrics': {}}


def post_results(results):
    try:
        url = f"{API_HOST}/health"
        resp = requests.get(url, timeout=5)
        print('posted health check ->', resp.status_code)
    except Exception as e:
        print('failed to contact API:', e)


def main():
    print('Running jobs...')
    r1 = run_meta_job()
    r2 = run_google_job()
    post_results([r1, r2])


if __name__ == '__main__':
    main()
