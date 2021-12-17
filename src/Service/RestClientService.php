<?php

namespace App\Service;

use Symfony\Component\HttpClient\HttpClient;
class RestClientService
{
    private $backEndUrl;
    private $walletUrl;
    private $prepaidUrl;
    private $otcURL;
    private $daxUrl;

    public function __construct()
    {
        $this->backEndUrl = $_ENV['MRTG_BACK_URL'];
        $this->backEndHeaders = [
            'token' => $_ENV['MRTG_BACK_TOKEN'],
            'identity' => $_ENV['MRTG_BACK_IDENTITY'],
            'Content-Type' => 'application/json',
            'Access-Control-Allow-Origin' => '*'
        ];

        // $this->accountsEngineHeaders = [
        //     'Token' => $_ENV['ACCOUNTS_ENGINE_TOKEN'],
        //     'Identity' => $_ENV['ACCOUNTS_ENGINE_IDENTITY'],
        //     'Content-Type' => 'application/json',
        //     'Access-Control-Allow-Origin' => '*'

        // ];
    }

    public function sendRequestAccountsJWT($method, $endpoint, $jwt, $data)
    {
        $client = HttpClient::create(['headers' => [
            'Authorization'    => 'Bearer '.$jwt,
        ]]);

        try {        
            $response = $client->request($method, $this->backEndUrl . $endpoint, ['json' => $data, 'timeout' => 5]);
            
            if ($response->getStatusCode() >= 400 && $response->getStatusCode() < 500) {
                return $response->toArray(false);
            } else if ($response->getStatusCode() === 500) {
                return ['error' => 'Server error'];
            } else {
                $data = $response->toArray();
                return $data;
            }
        } catch (\Exception $e) {
            return ['error' => 'Server error'];
        }
    }

    public function sendRequestBackEnd($method, $endpoint, $data)
    {
        $client = HttpClient::create();
        
        try {        
            $response = $client->request($method, $this->backEndUrl . $endpoint, [ 'headers' => $this->backEndHeaders, 
            'json' => $data]);
            
            if ($response->getStatusCode() >= 400 && $response->getStatusCode() <= 500) {
                return $response->toArray(false);
            } else if ($response->getStatusCode() === 500) {
                return ['error' => 'Server error'];
            } else {
                $data = $response->toArray();
                return $data;
            }
        } catch (\Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function sendRequestAccountsEngine($method, $endpoint, $data)
    {
        $client = HttpClient::create();
        
        try {        
            $response = $client->request($method, $this->accountsEngineUrl . $endpoint, [ 'headers' => $this->accountsEngineHeaders, 
            'json' => $data]);
            if ($response->getStatusCode() >= 400 && $response->getStatusCode() <= 500) {
                return $response->toArray(false);
            } else if ($response->getStatusCode() === 500) {
                return ['error' => 'Server error'];
            } else {
                $data = $response->toArray();
                return $data;
            }
        } catch (\Exception $e) {
            return ['error' => 'Server error'];
        }
    }
}