<?php
/**
 * Created by PhpStorm.
 * User: Yoan
 * Date: 24/10/2018
 * Time: 22:08
 */

abstract class Entity {

    protected $id;

    /**********/
    /* GETTER */
    /**********/
    /**
     * @return mixed
     */
    public function getId() {
        return $this->id;
    }

    /**********/
    /* SETTER */
    /**********/
    /**
     * @param mixed $id
     */
    public function setId($id) {
        $this->id = $id;
    }

}