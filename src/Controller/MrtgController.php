<?php

namespace App\Controller;
// header('Access-Control-Allow-Origin: *');
use App\Service\MrtgService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\BinaryFileResponse;


class MrtgController extends AbstractController
{
    private $mrtgService;

    public function __construct(MrtgService $mrtgService, ParameterBagInterface  $parameterBag)
    {
        $this->mrtgService = $mrtgService;
        $this->parameterBag = $parameterBag;
    }

    /**
     * @Route("/api/user_id", methods={"POST"}, name="user_id")
     */
    public function userId(Request $request)
    {
        $content = json_decode($request->getContent(), true);
        
        $response = $this->mrtgService->userId($content);

        if (array_key_exists('error', $response)) {
            return $this->json($response, JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }
        return $this->json($response);
    }

    /**
     * @Route("/api/register", methods={"POST"}, name="user_register")
     */
    public function userRegister(Request $request)
    {
        $content = json_decode($request->getContent(), true);
        $response = $this->mrtgService->userRegister($content);
        if (array_key_exists('error', $response)) {
            return $this->json($response, JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }
        return $this->json($response);
    }

    /**
     * @Route("/api/otp", methods={"POST"}, name="user_otp")
     */
    public function userOtp(Request $request)
    {
        $content = json_decode($request->getContent(), true);
        $response = $this->mrtgService->userOtp($content);

        if (array_key_exists('error', $response)) {
            return $this->json($response, JsonResponse::HTTP_NOT_FOUND);
        }

        return $this->json($response);
    }

    /**
     * @Route("/api/verify_otp", methods={"POST"}, name="user_verify_otp")
     */
    public function userVerifyOtp(Request $request)
    {
        $content = json_decode($request->getContent(), true);

        $response = $this->mrtgService->userVerifyOtp($content);

        if (array_key_exists('error', $response)) {
            return $this->json($response, JsonResponse::HTTP_NOT_FOUND);
        }

        return $this->json($response);
    }

    /**
     * @Route("/api/forgot_password", methods={"POST"}, name="forgot_password")
     */
    public function userForgotPassword(Request $request)
    {
        $content = json_decode($request->getContent(), true); 

        $response = $this->mrtgService->userForgotPassword($content);

        if (array_key_exists('error', $response)) {
            return $this->json($response, JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }
        return $this->json($response);
    }

    /**
     * @Route("/api/locations", methods={"GET"}, name="get_locations")
     */
    public function getLocations()
    {
        $response = $this->mrtgService->userGetLocations();

        if (array_key_exists('error', $response)) {
            return $this->json($response, JsonResponse::HTTP_BAD_REQUEST);
        }
        return $this->json($response);
    }

    /**
     * @Route("/api/tower_name", methods={"POST"}, name="get_tower_name")
     */
    public function getTowerNames(Request $request)
    {
        $content = json_decode($request->getContent(), true);
        //dd($content);
        $response = $this->mrtgService->userGetTowerNames($content);
        
        if (array_key_exists('error', $response)) {
            return $this->json($response, JsonResponse::HTTP_BAD_REQUEST);
        }
        return $this->json($response);
    }   

     /**
     * @Route("/api/graph/image", methods={"POST"}, name="get-image-graph")
     */
    public function getImage(Request $request)
    {
        try {
            $content = json_decode($request->getContent(), true);
            $imageName = $content["imageName"];
      
            $file = $this->parameterBag->get('kernel.project_dir').'/public/graphImage/graphs/'.$imageName;
            $response = new BinaryFileResponse($file);
            return $response;
        } catch (\Exception $e) {
            return $this->json(['error' => 'File not found'], JsonResponse::HTTP_NOT_FOUND);
        }
    }

}