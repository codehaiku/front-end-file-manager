<?php
namespace FrontEndFileManager\Src\File;

class File {

	protected $file_owner_id;

	protected $file_name;

    protected $file_label;

	protected $file_type;

	protected $file_description;

	protected $file_sharing_type;

	protected $date_updated;
	
	protected $date_created;

	public function __construct() {

	}

    /**
     * @return mixed
     */
    public function getFileOwnerId()
    {
        return $this->file_owner_id;
    }

    /**
     * @param mixed $file_owner_id
     *
     * @return self
     */
    public function setFileOwnerId($file_owner_id)
    {
        $this->file_owner_id = $file_owner_id;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getFileName()
    {
        return $this->file_name;
    }

    /**
     * @param mixed $file_name
     *
     * @return self
     */
    public function setFileName($file_name)
    {
        $this->file_name = $file_name;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getFileType()
    {
        return $this->file_type;
    }

    /**
     * @param mixed $file_type
     *
     * @return self
     */
    public function setFileType($file_type)
    {
        $this->file_type = $file_type;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getFileDescription()
    {
        return $this->file_description;
    }

    /**
     * @param mixed $file_description
     *
     * @return self
     */
    public function setFileDescription($file_description)
    {
        $this->file_description = $file_description;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getFileSharingType()
    {
        return $this->file_sharing_type;
    }

    /**
     * @param mixed $file_sharing_type
     *
     * @return self
     */
    public function setFileSharingType($file_sharing_type)
    {
        $this->file_sharing_type = $file_sharing_type;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getDateUpdated()
    {
        return $this->date_updated;
    }

    /**
     * @param mixed $date_updated
     *
     * @return self
     */
    public function setDateUpdated($date_updated)
    {
        $this->date_updated = $date_updated;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getDateCreated()
    {
        return $this->date_created;
    }

    /**
     * @param mixed $date_created
     *
     * @return self
     */
    public function setDateCreated($date_created)
    {
        $this->date_created = $date_created;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getFileLabel()
    {
        return $this->file_label;
    }

    /**
     * @param mixed $file_label
     *
     * @return self
     */
    public function setFileLabel($file_label)
    {
        $this->file_label = $file_label;

        return $this;
    }
}