<?php

namespace App\Service;

use Symfony\Component\HttpClient\HttpClient;

class MrtgService
{   
    /**
     * @var RestClientService
     */
    private $clientService;

    public function __construct(RestClientService $clientService)
    {
        $this->clientService = $clientService;
    }

    public function userId($jwt)
    {
        return $this->clientService->sendRequestAccountsJWT('GET', '/user/id', $jwt, null);
    }

    public function userLoad($jwt)
    {
        return $this->clientService->sendRequestAccountsJWT('GET', '/user', $jwt, null);
    }

    public function userRegister($data)
    {
        return $this->clientService->sendRequestBackEnd('POST', 'api/account/register', $data);
    }

    // public function userOtp($data)
    // {
    //     $response = $this->clientService->sendRequestAccounts('POST', '/account/otp', $data);
    //     if (is_array($response) && array_key_exists('message', $response) || array_key_exists('error', $response)) {
    //         return $response;
    //     }
    //     $this->otcService->otcSms($response);
    //     return ['account' => $response['account']];
    // }

    public function userVerifyOtp($data)
    {
        return $this->clientService->sendRequestAccounts('POST', '/account/verify_otp', $data);
    }

    public function userLoadQueue($id)
    {
        return $this->clientService->sendRequestAccounts('GET', '/account/package_queue/'.$id, null);
    }

    public function userQueuePackage($data)
    {
        return $this->clientService->sendRequestAccounts('POST', '/account/package_queue', $data);
    }

    public function userModalStatus($jwt, $data)
    {
        return $this->clientService->sendRequestAccountsJWT('PUT', '/update_modal_status', $jwt, $data);
    }

    public function userAutoRenewStatus($jwt, $data)
    {
        return $this->clientService->sendRequestAccountsJWT('PUT', '/update_auto_renew_status', $jwt, $data);
    }

    public function userQueuePackageConsumed($data)
    {
        return $this->clientService->sendRequestAccounts('PUT', '/account/package_queue_consumed', $data);
    }

    public function userGetOneQueue($queueId, $subscriberId)
    {
        return $this->clientService->sendRequestAccounts('GET', '/account/queue/'.$subscriberId.'/'.$queueId, null);
    }

    public function userQueueDelete($id)
    {
        return $this->clientService->sendRequestAccounts('DELETE', '/account/queue_delete/'.$id, null);
    }

    public function userWalletTransaction($data)
    {
        $response = $this->clientService->sendRequestAccounts('POST', '/account/transaction/wallet', $data);
        if (is_array($response) && array_key_exists('error', $response)) {
            $this->walletRetryService->logWalletRetry(
                $data['subscriberId'],
                $data['source'],
                $data['action'],
                $data['remarks'],
                $data['amount'],
                $data['currentBalance'],
                $data['transactionId'],
                $data['or'],
                $data['ar'],
                $response['error']
            );
        }
        return $response;
    }

    public function userPrepaidTransaction($data)
    {
        $response = $this->clientService->sendRequestAccounts('POST', '/account/transaction/prepaid', $data);
        if (is_array($response) && array_key_exists('error', $response)) {
            $this->prepaidRetryService->logPrepaidRetry(
                $data['subscriberId'],
                $data['hostIp'],
                $data['arpMac'],
                $data['daxIp'],
                $data['packageId'],
                $data['packageName'],
                $data['action'],
                $data['cost'],
                $data['sectorClassId'],
                $response['error']
            );
        }
        return $response;
    }

    public function userGetReceipt($data)
    {
        return $this->clientService->sendRequestAccounts('POST', '/account/receipt', $data);
    }

    public function userVerify($data)
    {
        return $this->clientService->sendRequestAccounts('POST', '/account/verify_user', $data);
    }

    public function userForgotPassword($data)
    {
        return $this->clientService->sendRequestAccounts('POST', '/account/forgot_password', $data);
    }
    /*
    public function userChildInvite($data)
    {
        return $this->clientService->sendRequestAccounts('PUT', '/account/child/invite', $data);
    }
    public function userChildInviteCancel($data)
    {
        return $this->clientService->sendRequestAccounts('PUT', '/account/child/invite_cancel', $data);
    }
    public function userParentAccept($data)
    {
        return $this->clientService->sendRequestAccounts('PUT', '/account/parent/accept', $data);
    }
    public function userParentRemove($data)
    {
        return $this->clientService->sendRequestAccounts('PUT', '/account/parent/remove', $data);
    }
    public function userParentDeny($data)
    {
        return $this->clientService->sendRequestAccounts('PUT', '/account/parent/deny', $data);
    }
    public function userChildRemove($data)
    {
        return $this->clientService->sendRequestAccounts('PUT', '/account/child/remove', $data);
    } 
    */
    public function userUpdateSubscriberType($data)
    {
        return $this->clientService->sendRequestAccounts('PUT', '/account/update_subscriber_type', $data);
    }

    public function userUpdateChildStatus($data)
    {
        return $this->clientService->sendRequestAccounts('PUT', '/account/update_child_status', $data);
    }

    public function userFreeTrialCheck($data)
    {
        return $this->clientService->sendRequestAccounts('POST', '/account/free-trial', $data);
    }

    public function userFreeTrialLog($data)
    {
        return $this->clientService->sendRequestAccounts('POST', '/account/free-trial-log', $data);
    }

    public function userGetLocations()
    {
        return $this->clientService->sendRequestAccounts('GET', '/account/location', null);
    }

    public function userGetTowerNames($data)
    {
        return $this->clientService->sendRequestAccounts('POST', '/account/tower_name', $data);
    }
}